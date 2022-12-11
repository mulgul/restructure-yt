# Ensure ffmpeg, and yt-dlp are downloaded, and if they arent download them. This supports ubuntu, debian, and macOS.

uname_out="$(uname -s)"
case "${uname_out}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Darwin;;
esac

echo ${machine}

declare -a pkgs=("ffmpeg" "yt-dlp" "nginx")
if [[ $machine = "Darwin" ]]
then
    command -v brew >/dev/null 2>&1 || (echo "Homebrew is not installed. Exiting." && exit 1); 
    for pkg in "${pkgs[@]}"; do
        install=false

        t=`which $pkg`
        [ -z "$t" ] && echo "${pkg} isn't installed!" && $install=true

        if $install
        then
            brew install $pkg
        else
            brew upgrade $pkg
        fi
    done
elif [[ $machine = "Linux" ]]
then
    for pkg in "${pkgs[@]}"; do
        status="$(dpkg-query -W --showformat='${db:Status-Status}' "$pkg" 2>&1)"
        if [ ! $? = 0 ] || [ ! "$status" = installed ]; then
            sudo apt install "$pkg"
        fi
    done
fi
