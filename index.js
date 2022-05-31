const puppeteer = require("puppeteer");
const fs = require("fs");
const csv = require("csvtojson");
const { Parser } = require("json2csv");

const CSV_File_Name = "data.csv";
const WAIT_BETWEEN_MESSAGES = 2000; //the waiting time between messages,  increase it if your nternet connection is slow;

async function main() {
  const data = await csv().fromFile("data.csv");
  const browser = await puppeteer.launch({
    executablePath: "C:Program Files\\Google\\Chrome\\Application\\chrome.exe", //configure this to match your chrome profile path
    headless: false,
    // excludeSwitches: 'enable-automation',
    defaultViewport: null,
    args: [
      "--user-data-dir=C:\\Users\\Mahmo\\AppData\\Local\\Google\\Chrome\\User Data", //configure this to match your chrome profile data path
    ],
  });
  try {
    const page = await browser.newPage();
    await page.goto("https://web.whatsapp.com/");
    //await delay(20000); //wait to scan QR code
    //console.log("You must have scanned the QR code");
    console.log("Browser has opened successfully");
    for (var i = 0; i < data.length; ++i) {
      if (data[i].Status == "Successful") {
        console.log(`Message to ${name} at row ${i + 1} has aleady sent`);
        continue;
      }
      var name = data[i].Name;
      var phone = data[i].Mobile;
      var message = `Hello ${name}\n`;
      message += `How are you, I hope you're fine.\n\n`;
      try {
        await page.goto(
          encodeURI(
            `https://web.whatsapp.com/send?phone=${phone}&text=${message}`
          )
        );
        await page.setDefaultNavigationTimeout(0);
        await page.waitForSelector(
          "#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div._3HQNh._1Ae7k > button"
        );
        await delay(800);
        await page.click(
          "#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div._3HQNh._1Ae7k > button"
        );
        data[i].Status = "Successful";
        console.log(`Message sent to ${name} at row ${i + 1}`);
      } catch (err) {
        data[i].Status = "Failed";
        console.log(`Failed to send message to ${name} at row ${i + 1}`);
        console.error(err);

        //save data so far
        const ModifiedData = new Parser({
          fields: ["Name", "Mobile", "Status", "AnotherData"],
        }).parse(data);
        fs.writeFileSync(CSV_File_Name, ModifiedData);
      }
      await delay(WAIT_BETWEEN_MESSAGES);
    }
    console.log("Mission Accomplished,All messages has been sent");
  } catch (err) {
    console.error(err);
  } finally {
    const ModifiedData = new Parser({
      fields: ["Name", "Mobile", "Status", "AnotherData"],
    }).parse(data);
    fs.writeFileSync(CSV_File_Name, ModifiedData);
    console.log("Data Saved");
    await browser.close();
  }
}
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

main();