const Pusher = require("pusher");

const pusher = new Pusher({
  appId:"1504922",
  key:"cbec614b7d68cc5dd256",
  secret:"a4bc5dcfc0b63cbc8393",
  cluster: "eu",
  useTLS: true
});

module.exports=pusher




