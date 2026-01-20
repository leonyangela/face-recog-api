const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
// const Clarifai = require("clarifai");
// console.log(Clarifai);

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_PAT}`);

const handleApiCall = (req, res) => {
  if (!req.body.input) {
    return res.status(400).json({ error: "No image URL provided" });
  }

  const userId = process.env.CLARIFAI_USER_ID; // from Clarifai portal
  const appId = process.env.CLARIFAI_APP_ID;

  stub.PostModelOutputs(
    {
      user_app_id: { user_id: userId, app_id: appId },
      // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
      model_id: "face-detection",
      version_id: "45fb9a671625463fa646c3523a3087d5",
      // inputs: [{ data: { image: { url: req.body.input } } }],
      inputs: [
        {
          data: {
            image: {
              url: req.body.input,
              // base64: imageBytes,
              // allow_duplicate_url: true,
            },
          },
      },
      ],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return res.status(500).json({ error: err });
      }

      if (response.status.code !== 10000) {
        // throw new Error(
        //   "Post model outputs failed, status: " + response.status.description
        // );
        console.log(
          `Post model outputs failed, status: ${response.status.description}`
        );
        return res.status(500).json({ error: response.status.description });
      }

      const regions = response.outputs[0].data.regions;
      res.json(response);

      regions.forEach((region) => {
        // Accessing and rounding the bounding box values
        const boundingBox = region.region_info.bounding_box;
        const topRow = boundingBox.top_row.toFixed(3);
        const leftCol = boundingBox.left_col.toFixed(3);
        const bottomRow = boundingBox.bottom_row.toFixed(3);
        const rightCol = boundingBox.right_col.toFixed(3);

        region.data.concepts.forEach((concept) => {
          // Accessing and rounding the concept value
          const name = concept.name;
          const value = concept.value.toFixed(4);

          console.log(
            `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
          );
        });
      });
    }
  );
};

module.exports = { handleApiCall };
