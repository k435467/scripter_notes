---
sidebar_position: 4
---

# Git

Some git commands. [Git cheat sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet).

## Clone

`-depth=1` : Shallow clone with a history truncated to the specified number of commits.

## Branch

`git branch <branch-name> 3c5c49e`

`git branch -m <branch-name>` : Rename.

`-a` : all

## Switch

`git switch <branch-name>` : Create and checkout to a branch that track to the remote branch.

## Stash

`git stash save <message>`

`-u` or `--include-untracked`

`-a` or `--all` : Include ignored files.

`git stash push <path>` : For a specific file.

`git stash clear` : Delete all stashes.

## Rebase

The hash changed because the parent has changed.

`git rebase --onto <newbase> <oldbase>`

## Reflog

`git reflog` or `git reflog show HEAD`

`--relative-date` : Show date info.

## Reset

`--soft` : Keep files. **commit**. After a reset, a change would be **staged** and a newly added file would be **staged** .

`--mix` : Keep files. **commit**, **staging index**. After a reset, a change would be **modified** and a newly added file would be **untracked** . (default)

`--hard` : Remove files. **commit**, **staging index**, **working directory**.

## Tag

Tags aren’t automatically pushed when you push a branch or use the
`--all` flag. The `--tags` flag sends all of your local tags to the remote repo.

`git tag <tagname>`

## Push

`git push origin :<branch_name>` : Delete a remote branch

## Others

Add color and branch name to zsh prompt. [ref](https://gist.github.com/reinvanoyen/05bcfe95ca9cb5041a4eafd29309ff29).

```shell title='.zshrc'
function parse_git_branch() {
    git branch 2> /dev/null | sed -n -e 's/^\* \(.*\)/[\1] /p'
}

COLOR_DEF=$'%f'
COLOR_USR=$'%F{243}'
COLOR_DIR=$'%F{197}'
COLOR_GIT=$'%F{39}'
setopt PROMPT_SUBST
export PROMPT='${COLOR_USR}%n ${COLOR_DIR}%2~ ${COLOR_GIT}$(parse_git_branch)${COLOR_DEF}$ '
```