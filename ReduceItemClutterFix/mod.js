//Example mod tested to "Works on my machine" levels on D2R.exe version 1.6.84219 and D2RMM 1.7.3
//Obviously don't try and run both this and the original mod at the same time.
//See the README.md for details

const fileName = "global\\excel\\treasureclassex.txt";
let file = D2RMM.readTsv(fileName);

//I didn't bother setting up D2RMM configurations, so I just hardcoded a working example.
const TCS_TO_REMOVE = new Set( 
[
    "hp1", "hp2", "hp3", "hp4", "mp1", "mp2", "mp3", "mp4", //Mana & Healing potions < Super
    "rvs", "yps", "vps", "wms", //Small Rejuvs & Utility Potions
    "gps", "ops", "gpm", "gpl", "opm", "gpl", "opl", //Throwing Potions
    "gcv", "gcw", "gcg", "gcr", "gcb", "skc", "gcy", //Chipped Gems
    "gfv", "gfw", "gfg", "gfr", "gfb", "skf", "gfy", //Flawed Gems
    "gsv", "gsw", "gsg", "gsr", "gsb", "sku", "gsy", //Standard Gems
    "tsc", "isc", //Town/ID scrolls,
    "aqv", "cqv", //Arrows & bolts
    "key", //Keys
]);

file.rows.forEach((row) => 
{
    for (let i = 1; i <= 10; i++)
    {
        if (TCS_TO_REMOVE.has(row[`Item${i}`]))
        {
            row[`Item${i}`] = "gld"; 
        }
    }
});

D2RMM.writeTsv(fileName, file);