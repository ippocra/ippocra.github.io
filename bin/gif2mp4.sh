#!/usr/bin/env bash

# ------------------------------------------------------------
# gif2mp4.sh – Convert all GIFs in a folder to MP4s
#
# Usage: ./gif2mp4.sh /path/to/folder
#
# Requirements:
#   • ffmpeg must be installed and reachable in $PATH
#   • The script works on Linux/macOS (Bash)
# ------------------------------------------------------------

set -euo pipefail   # safer scripting

# ---------- Helper ----------
usage() {
    echo "Usage: $0 <folder>"
    echo "Converts every *.gif in <folder> to an MP4 with the same name."
    exit 1
}

# ---------- Argument check ----------
if [[ $# -ne 1 ]]; then
    usage
fi

DIR="$1"

# Make sure the argument is a readable directory
if [[ ! -d "$DIR" || ! -r "$DIR" ]]; then
    echo "Error: '$DIR' is not a readable directory."
    exit 2
fi

# ---------- Conversion ----------
shopt -s nullglob   # makes the for‑loop skip if no matches

cd "$DIR"

for gif in *.gif; do
    # Skip if there are no .gif files
    [[ -e "$gif" ]] || continue

    mp4="${gif%.gif}.mp4"

    echo "Converting '$gif' → '$mp4' …"

    # ffmpeg command:
    #   -y                : overwrite output if it already exists
    #   -i "$gif"         : input file
    #   -c:v libx264      : encode video with H.264 (good compatibility)
    #   -pix_fmt yuv420p  : ensure broad player support
    #   -movflags +faststart : place moov atom at file start for streaming
    #   -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2"
    #                     : force width/height to even numbers (required by many codecs)
    ffmpeg -y -i "$gif" \
        -c:v libx264 -pix_fmt yuv420p -movflags +faststart \
        -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
        "$mp4"
done

echo "All done."