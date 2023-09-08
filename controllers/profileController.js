const fs = require("fs");

const getProfile = async (req, res) => {
  const { slack_name, track } = req.query;

  if (!slack_name || !track) {
    return res.status(400).json({
      error:
        "You might be missing parameters: slack_name and track are required in your query string",
    });
  }

  fs.readFile("./data/profile.js", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching the profile" });
    }
    const profileCollection = JSON.parse(data);

    console.log(profileCollection[0].slack_name);

    // use slack_name and track to find profile
    const lowercaseSlackName = slack_name.toLowerCase();
    const lowercaseTrack = track.toLowerCase();

    // Use lowercase for comparison
    const findProfile = profileCollection.find(
      (profile) =>
        profile.slack_name.toLowerCase() === lowercaseSlackName &&
        profile.track.toLowerCase() === lowercaseTrack
        )

    const currentDate = new Date().toUTCString();
    const current_day = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    const utc_time = currentDate;

    if (findProfile) {
      res.status(200).json({
        ...findProfile,
        current_day,
        utc_time,
        status_code: 200,
      });
    } else {
      res.status(404).json({
        error:
          "Profile not found. If it's two names write it this way: purity-gwaro OR Purity-Gwaro. The space has to be there.",
        current_day,
        utc_time,
        status_code: 404,
      });
    }
  });
};

module.exports = {
  getProfile,
};
