# D2RMM-ReduceItemClutterFix

Proof of concept fix for the [D2RMM](https://www.nexusmods.com/diablo2resurrected/mods/169?tab=description) Diablo II Resureccted mod "Reduce Item Clutter" on [NexusMods](https://www.nexusmods.com/diablo2resurrected/mods/421?tab=description).\
After testing done on drops with a fixed seed on LK superchests, drop rates appear to be altered by the original mod.

## Drop Rate Problem
After a couple hours playing with the mod and doing some very exciting Lower Kurast runs, I got hit by a huge paranoia attack. Drops did not seem "Vanilla without useless garbage".\
Since reverse engineering D2R is a headache (Blizzard in their infinite wisdom decided to VMProtect the executable, no way I'm losing days of time to reverse that), I decided to test \
drops in the only way I could think of: the D2R.exe `-seed` parameter.

## The Testing Process
I backed up my SP saves and created a quick Fire Sorc from the [HeroEditor](https://d2runewizard.com/hero-editor) presets (which you can also download in the releases of this project). \
`D2R.exe` was run with the following target parameters: `-enablerespec -mod D2RMM -txt -seed 494790446`. The most imporant one is `seed`, that guarantees the same exact drops on multiple runs. \
Apologies for the awful brightness on the sample images, but special thanks to NVIDIA for saving the game screeshot in .jxr format because I dared to use HDR on my monitor. I had to use the stupid Win11 snipping tool
to "convert" the pictures to .png. Don't laugh.

<p align="left" >
  <img src="Images/Vanilla.png" width="1024" height="576" title="Vanilla Drops">
</p>

These are the vanilla drops I get from this LK super chest. No drop manipulation. Upon testing at least a dozen times, these drops are consistent on every single run by just teleporting to the LK waypoint \
and clicking the super chest in the closest hut south-west of the waypoint (which you can in the top right of the image). \
I then installed the Reduce Item Clutter mod in D2RMM, set the strictness to "Low" and disabled every single junk drop, keeping only Flawless Gems and all Runes visible.

<p align="left" >
  <img src="Images/Low-Strictness-Removed-Garbage.png" width="1024" height="576" title="With Mod - Low Strictness, no garbage">
</p>

The garbage is indeed gone, but the remaining item doesn't exactly match the vanilla counterpart. I then defaulted all of the mods settings and tried changing only the strictness.

<p align="left" >
  <img src="Images/Medium-Strictness.png" width="1024" height="576" title="With Mod - Medium Strictness">
  <img src="Images/High-Strictness.png" width="1024" height="576" title="With Mod - High Strictness">
</p>

So something is clearly wrong. I decided to hold my vomit and dive into the land of JavaScript, and looked at the modder's implementation of his Treasure Class manipulation \
(all offense to JavaScript, none to the modder. His JS code is probably better than mine). In the mod, unwanted Treasure Class items are simply zeroed out with an empty string and changing the `NoDrop` column. \
A logical attempt all in all, but apparently not functional. So i spent a good couple hours digging up resources from MrLlamaSC youtube videos and 10 year old D2 LoD modding forums. Long story short, in LoD they \
just made .exe code edits to implement actual item filters (like in ProjectDiablo II), and by crossreferencing the [Maxroll D2 Drop Calculator](https://maxroll.gg/d2/d2-drop-calculator) and the one at [Silospen](https://dropcalc.silospen.com/) \
I managed to get a better understanding of how drops are calculated. Once again, I can't give you a concrete drop rate data set, all my experiments are limited to the static seed method.

## My "Close Enough" Solution

<p align="left" >
  <img src="Images/MyFix.png" width="1024" height="576" title="My Fix">
</p>

All the drops from the Vanilla setup are present, and the garbage I filtered out is replaced with piles of gold (for reference, all junk is filtered except Super pots and Full rejuvs). I tried for at least 2 hours to simply remove the unwanted junk; \
first attempt added a dummy Treasure Class at the top of the txt file that dropped nothing, but that still skewed the drop tables. I then also tried to remove all unwanted TCs and recomputing every affected drop probability to match the vanilla values, \
but that ended up also not working (it even crashed my game once, I'm guessing a deleted TC got referenced somewhere else and caused a nice NULL dereference). \
So I safely concluded that D2R does not like when you try to drop nothing from a Treasure Class, which led to the gold trick. Why use gold? because the player can pick it up by just running around, so it auto de-clutters eventually. \
Effectively, you can actually see useful drops on a `/players 7` cow level by just running around and collecting gold, without needing to use the stupid zoom in. \
The only downside I can think of is the inevitable inflation that will hit the vendors of sanctuary. \
I provide a sample [mod.js](https://github.com/Moze-lol/D2RMM-ReduceItemClutterFix/blob/main/ReduceItemClutterFix/mod.js) as a reference. I strongly recommend against using the code as is, as I'm a C++ programmer, and not a JS expert by any means. \
(if you really want to use the code though, license is MIT, do whatever you want with it). \
\
Thanks for coming to my ted talk on "Why VM Proctecting your executables is dosghit practice", as with the ability to reverse engineer the game I could actually get some solid data on drop rates, but these are my findings with the specified restrictions. \
In the release section you can find a working setup you can use in D2RMM and the save file I used for my testing.