#!/bin/bash
# Installs Homebrew, HVM, and Hugo (skips if already installed)
# Run: ./scripts/install-deps.sh

set -e
HVM_VERSION="v0.11.0"
ARCH=$(uname -m)
[ "$ARCH" = "arm64" ] && HVM_ARCH="darwin-arm64" || HVM_ARCH="darwin-amd64"
HVM_URL="https://github.com/jmooring/hvm/releases/download/${HVM_VERSION}/hvm-${HVM_ARCH}.tar.gz"
BREW_INSTALL="https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh"
LOCAL_BIN="$HOME/.local/bin"
SHELL_RC="$HOME/.zshrc"

ensure_path() {
  mkdir -p "$LOCAL_BIN"
  if ! echo ":$PATH:" | grep -q ":$LOCAL_BIN:"; then
    echo "" >> "$SHELL_RC"
    echo "# Local binaries" >> "$SHELL_RC"
    echo "export PATH=\"$LOCAL_BIN:\$PATH\"" >> "$SHELL_RC"
    export PATH="$LOCAL_BIN:$PATH"
    echo "Added $LOCAL_BIN to PATH in $SHELL_RC"
  fi
}

# 1. Homebrew
install_brew() {
  if command -v brew &>/dev/null; then
    echo "✓ Homebrew already installed: $(brew --version | head -1)"
    return
  fi
  if [ -x /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
    echo "✓ Homebrew found at /opt/homebrew, added to PATH"
    return
  fi
  echo "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL $BREW_INSTALL)"
  if [ -x /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> "$SHELL_RC"
    echo "✓ Homebrew installed"
  else
    echo "⚠ Homebrew install may need manual completion. Run: /bin/bash -c \"\$(curl -fsSL $BREW_INSTALL)\""
  fi
}

# 2. HVM (Hugo Version Manager)
install_hvm() {
  if command -v hvm &>/dev/null; then
    echo "✓ HVM already installed: $(hvm version 2>/dev/null || hvm --version 2>/dev/null || echo 'ok')"
    return
  fi
  ensure_path
  echo "Installing HVM..."
  curl -sL "$HVM_URL" -o /tmp/hvm.tar.gz
  tar -xzf /tmp/hvm.tar.gz -C /tmp
  mv /tmp/hvm "$LOCAL_BIN/hvm"
  chmod +x "$LOCAL_BIN/hvm"
  rm -f /tmp/hvm.tar.gz
  if [ -f "$SHELL_RC" ] && ! grep -q "hvm gen alias" "$SHELL_RC"; then
    "$LOCAL_BIN/hvm" gen alias zsh >> "$SHELL_RC" 2>/dev/null || true
    echo "Added HVM alias to $SHELL_RC — run: source $SHELL_RC"
  fi
  export PATH="$LOCAL_BIN:$PATH"
  echo "✓ HVM installed to $LOCAL_BIN"
}

# 3. Hugo (via HVM or Homebrew)
install_hugo() {
  if command -v hugo &>/dev/null; then
    echo "✓ Hugo already installed: $(hugo version)"
    return
  fi
  export PATH="$LOCAL_BIN:$PATH"
  if command -v hvm &>/dev/null && [ -f .hvm ]; then
    echo "Installing Hugo via HVM (from .hvm)..."
    hvm use --useVersionInDotFile
    echo "✓ Hugo installed via HVM"
    return
  fi
  if command -v brew &>/dev/null || [ -x /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)" 2>/dev/null || true
    echo "Installing Hugo via Homebrew..."
    brew install hugo
    echo "✓ Hugo installed via Homebrew"
    return
  fi
  echo "⚠ Could not install Hugo. Install Homebrew or HVM first."
}

cd "$(dirname "$0")/.."
echo "Checking dependencies..."
install_hvm
install_hugo
install_brew || {
  echo ""
  echo "Homebrew install needs your password. Run in Terminal:"
  echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
  echo "  Then: echo 'eval \"\$(/opt/homebrew/bin/brew shellenv)\"' >> $SHELL_RC && source $SHELL_RC"
}
echo ""
echo "Done. Run: source $SHELL_RC — then: hugo version"
