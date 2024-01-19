import Localization from "../models/locModel.js";

const createLoc = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a localization",
    });
  }

  const loc = new Localization(body);

  loc
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: loc._id,
        message: "Localization Created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Localization not created",
      });
    });
};

const updateLoc = async (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must to provide a body to update localization",
    });
  }

  try {
    // const loc = await Localization.findOne({ _id: req.params.id });

    // loc.location = body.location;
    // loc.responsible = body.responsible;
    // loc.city = body.city;
    // loc.phone = body.phone;
    // loc.mail = body.mail;
    // loc.description = body.description;

    // loc
    //   .save()
    //   .then(() => {
    //     return res.status(200).json({
    //       success: true,
    //       id: loc._id,
    //       message: "Localization updated",
    //     });
    //   })
    //   .catch((error) => {
    //     return res.status(404).json({
    //       error,
    //       message: "Localization not updated",
    //     });
    //   });

    await Localization.updateMany({ _id: req.params.id }, body)
      .then(() => {
        return res.status(200).json({
          success: true,
          id: req.params.id,
          message: "Localization updated",
        });
      })
      .catch((error) => {
        console.log("d12312312");
        return res.status(404).json({
          error,
          message: "Localization not updated",
        });
      });
  } catch (err) {
    return res.status(404).json({
      err,
      message: "Localization not found!",
    });
  }
};

const deleteLoc = async (req, res) => {
  try {
    const result = await Localization.findOneAndDelete({ _id: req.params.id });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Localization not found",
      });
    }

    return res.status(200).json({
      succes: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const getLocs = async (req, res) => {
  try {
    const result = await Localization.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Locs not found",
      });
    }

    return res.status(200).json({
      succes: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const getLocById = async (req, res) => {
  try {
    const result = await Localization.findOne({ _id: req.params.id });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Localization not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

export default {
  createLoc,
  updateLoc,
  deleteLoc,
  getLocs,
  getLocById,
};
