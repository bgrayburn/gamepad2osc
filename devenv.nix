{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = [ pkgs.git ];

  # https://devenv.sh/languages/
  # languages.nix.enable = true;
  languages.javascript = {
    enable = true;
    npm.install.enable = true;
  };

  # https://devenv.sh/pre-commit-hooks/
  pre-commit.hooks.prettier.enable = true;

  # https://devenv.sh/processes/
  processes.gamepad2osc.exec = "npm run start";

  # See full reference at https://devenv.sh/reference/options/
}
