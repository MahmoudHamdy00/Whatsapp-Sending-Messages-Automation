# Whatsapp-Sending-Messages-Automation

This script is written in JavaScript to automate sending messages to WhatsApp numbers using puppeteer.

## Run it locally

- Clone the repo `git clone https://github.com/MahmoudHamdy00/Whatsapp-Sending-Messages-Automation.git`
- Change the current directory  `cd .\Whatsapp-Sending-Messages-Automation\`
- Install dependencies run `npm i`
- Modify the `message` and the delay between messages `WAIT_BETWEEN_MESSAGES` as you want,and add your data in a CSV file then  set its name in `CSV_File_Name` then run`npm start`

## Notes

- The name and phone number header must be `Name`, `Mobile` respectively
- The phone numbers must be formatted  as +(country code)(number) example `+201012345678`.
- While the code is running, if it redirects to the next message and the previous one wasn't sent, `click` on the cancel to reject redirection (this will make the status of the failed message as failed.)but this will make the next message failed also, so you have to run the script again after it finishes (all successful messages won't be sent again)- or you can avoid this by increasing the delay time in `WAIT_BETWEEN_MESSAGES`

## Future  updates

- Improve performance  (decrease the delay time)
- make the delay time between messages dependent  on the message status  (wait until it has been sent)
- check whether the number have whatsapp or not
- make it generic (remove the hardcoded  paths)
- format phone numbers to be.
