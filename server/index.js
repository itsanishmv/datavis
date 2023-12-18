const express = require("express");
const { google } = require("googleapis");
const { authenticate, refreshToken } = require("@google-cloud/local-auth");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
const sheetsData = {
  spreadsheetId: "1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0",
  range: "Sheet3!A1:ZZZ",
};
// app.use(cookieParser());
app.use(cors(corsOptions));
async function authorize() {
  const keyFilePath = path.join(__dirname, "credentials.json");
  const auth = await authenticate({
    keyfilePath: keyFilePath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  //   const validateAuth = auth.credentials;
  //   console.log("validateauth : ", validateAuth);
  return google.sheets({ version: "v4", auth });
}

async function getSheetsData() {
  const res = await authorize();
  const data = await res?.spreadsheets.values.get(sheetsData);
  //   console.log(data.data.values);
  return data?.data.values;
}
const dummy = [
  ["15/10/2022", ">25", "Male", "671", "289", "467", "734", "661", "222"],
  ["15/10/2022", "15-25", "Female", "879", "391", "571", "330", "77", "719"],
  ["15/10/2022", ">25", "Female", "432", "661", "743", "381", "676", "839"],
  ["16/10/2022", "15-25", "Male", "863", "742", "698", "186", "791", "783"],
  ["16/10/2022", ">25", "Male", "861", "363", "78", "464", "219", "980"],
  ["16/10/2022", "15-25", "Female", "686", "274", "40", "325", "894", "545"],
  ["16/10/2022", ">25", "Female", "137", "59", "697", "595", "403", "492"],
  ["17/10/2022", "15-25", "Male", "675", "333", "343", "82", "953", "111"],
  ["17/10/2022", ">25", "Male", "416", "207", "704", "214", "666", "188"],
  ["17/10/2022", "15-25", "Female", "981", "752", "71", "335", "784", "319"],
  ["17/10/2022", ">25", "Female", "640", "285", "375", "699", "955", "278"],
  ["18/10/2022", "15-25", "Male", "595", "144", "430", "866", "927", "244"],
  ["18/10/2022", ">25", "Male", "812", "485", "699", "812", "428", "571"],
  ["18/10/2022", "15-25", "Female", "736", "192", "222", "135", "673", "56"],
  ["18/10/2022", ">25", "Female", "23", "501", "946", "558", "441", "684"],
  ["19/10/2022", "15-25", "Male", "262", "247", "420", "687", "702", "407"],
  ["19/10/2022", ">25", "Male", "399", "571", "31", "677", "742", "416"],
  ["19/10/2022", "15-25", "Female", "931", "721", "901", "670", "868", "687"],
  ["19/10/2022", ">25", "Female", "554", "87", "238", "530", "35", "327"],
  ["20/10/2022", "15-25", "Male", "142", "352", "820", "126", "448", "556"],
  ["20/10/2022", ">25", "Male", "777", "70", "617", "877", "55", "172"],
  ["20/10/2022", "15-25", "Female", "474", "930", "326", "535", "619", "21"],
  ["20/10/2022", ">25", "Female", "525", "363", "493", "243", "154", "756"],
];
app.get("/sheets", (req, res) => {
  //   getSheetsData().then((data) => res.json(data));
  res.json(dummy);
});

// app.get("/", (req, res) => {
//     if (req.cookies.mycookie) {
//       res.send(getSheetsData())
//     } else {

//     }
//     //   res.cookie("mycookie", "123", {
//     //     maxAge: 3600000, // Cookie will expire after 1 hour (in milliseconds)
//     //     httpOnly: true, // Cookie is accessible only through the HTTP(S) protocol
//     //   });
//     res.send("cookie set successfully");
//   });
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
