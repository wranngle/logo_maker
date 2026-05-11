# demo/cassette.tape - VHS recording script (https://github.com/charmbracelet/vhs)

Output demo/cassette.gif

Set FontSize 18
Set Width 1200
Set Height 720
Set Padding 20
Set Theme "Catppuccin Frappé"

Type "bun run generate -- raw/logo-data-url.txt --output /tmp/logo-maker-demo"
Enter
Sleep 1s
Type "find /tmp/logo-maker-demo -maxdepth 2 -type f | sort"
Enter
Sleep 3s
