import userModel from "../models/userModel.js";
import { CheckEnvironmentKey } from "../utils/util.js";
import { sendResponse } from "../utils/util.js";

const isObjectEmpty = (objectName) => {
  for (let prop in objectName) {
    if (objectName.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

const range = (x, min, max) => {
  return x >= min && x <= max;
};

const gemRanges = [
  {
    range: [46, 50],
    name: "แอเมทิสต์",
    description:
      "สีสันที่เฉพาะตัวของอัญมณีแอเมทิสต์อันแสนสวยงาม เป็นองค์แห่งสติปัญญาทั้งปวง ประดับประดาสัญชาตญาณของเหล่ามนุษย์ให้ปราดเปรื่อง และคอยช่วยผดุงไว้ซึ่งชัยชนะอันอำนวยด้วยขวัญแห่งอัญมณี",
  },
  {
    range: [41, 45],
    name: "บุษราคัม",
    description:
      "“บุษราคัม” อัญมณีแห่งโชคลาภ ความสำเร็จที่ไม่มีวันโรยรา เปรียบเสมือนคำพูดที่ว่า destiny is destined by you มีเพียงคุณเท่านั้นที่เป็นผู้ลิขิตได้! ไม่ว่าจะเจอเรื่องหนักหนาเพียงใด เพียงเชื่อมั่นกับตัวเอง “ฉันทำได้” ไม่มีสิ่งใดจะพรากคุณจากความฝันไปได้ แล้วตัวคุณจะดึงดูดสิ่งดี ๆ เข้ามาหาคุณเอง\n\nเมื่อหัวใจของคุณสู้ พร้อมกับใช้หัวใจนำทาง โชคชะตาจะนำพาความสำเร็จมาให้คุณเอง",
  },
  {
    range: [36, 40],
    name: "ไข่มุก",
    description:
      "“ไข่มุก” ตัวแทนความบริสุทธิ์ผุดผ่อง นุ่มนวล สงบสุข และอ่อนหวาน ที่เป็นของขวัญจากท้องทะเลกว้างใหญ่ และด้วยความบริสุทธิ์ของไข่มุกสามารถช่วยรักษาสมดุลของอารมณ์ที่แปรปรวนไร้ความมั่นคงได้ ช่วยให้มีความอ่อนโยนและนุ่มนวล แต่ยังมั่นคงแข็งแกร่ง ยืนหยัดเพื่อตนเองอยู่เสมอ เปรียบเสมือนภายนอกที่มีความอ่อนหวานบริสุทธิ์ แต่ก็มีความมุ่งมั่นตั้งใจและรักที่จะไขว่คว้าเป้าหมายที่ตนปรารถนาอย่างไม่ลดละ",
  },
  {
    range: [31, 35],
    name: "โทแพซ",
    description:
      "“โทแพซ” อัญมณีแห่งความโชคดี เป็นอัญมณีที่มีความหมายอย่างหลากหลาย โดยมักจะสื่อถึงความแข็งแกร่งทางร่างกายและจิตใจ รวมถึงความมีชีวิตชีวา การมีความคิดสร้างสรรค์และแรงบันดาลใจเป็นเลิศ มีความสงบทางอารมณ์ ช่วยในการชี้แนะจุดมุ่งหมาย และยังส่งเสริมเรื่องของความเข้าใจลึกลงไปของจิตใจอีกด้วย",
  },
  {
    range: [26, 30],
    name: "ทับทิม",
    description:
      "“ทับทิม” มณีที่พ้องกับชื่อผลไม้นี้ ไม่ได้เป็นเพียงอัญมณีของความรักและอำนาจ แต่อัญมณีล้ำค่านี้ยังเป็นแสงสว่างให้ผู้เดินทาง คอยเปล่งแสงสีแดงแห่งชีวิต ปัดเป่าสิ่งชั่วร้ายและโรคภัยให้ไม่สามารถทำอันตรายได้ อัญมณีสีชาดนี้จะปกป้องและดลบันดาลความสำเร็จแก่ผู้ที่ครอบครอง\n\nด้วยความพยายามที่มอดไหม้ร้อนแรงดังเปลวประกายเพลิงนี้",
  },
  {
    range: [21, 25],
    name: "เพทาย",
    description:
      "“เพทาย” อัญมณีสีฟ้าสง่าน่าเกรงขาม เป็นที่รู้จักและแพร่หลายมาอย่างยาวนาน เป็นอัญมณีแห่งความโชคดี และสัญลักษณ์แห่งความฉลาด เครื่องรางป้องกันความชั่วร้ายและก้าวไปสู่ความสำเร็จ ดึงดูดผู้ที่มีความใฝ่ฝัน กล้าที่จะเดินตามความฝันและมุ่งมั่นที่จะทำฝันนั้นให้เป็นจริง\n\nอัญมณีนี้กำลังดึงดูดคนที่มีความใฝ่ฝัน มีความกล้าที่จะเดินตามความฝันและมุ่งมั่นที่จะทำฝันนั้นให้เป็นจริง",
  },
  {
    range: [16, 20],
    name: "ไพลิน",
    description:
      "“ไพลิน” อัญมณีสีนํ้าเงินแกมม่วงหรือนํ้าเงินสดมีประกายแวววาวที่จะพาคุณเปล่งประกายระยิบระยับไปกับความฝันของตัวเอง ไพลินจะเป็นตัวช่วยให้คุณมีสมาธิ แน่วแน่ ปกป้องภัยร้ายและช่วยให้ประสบความสำเร็จ พร้อมค้นหาความเป็นตัวของตัวเองเสมือนไพลินหลากหลายรูปแบบที่ถูกค้นพบและนิยามความหมายไว้ต่างกันตามแหล่งที่เจอ",
  },
  {
    range: [11, 15],
    name: "ทัวร์มาลีน",
    description:
      "“ทัวร์มาลีน” เปรียบดั่งความฝันอันแสนสวยงามในโลกแห่งอัญมณี ทุกคนล้วนมีความฝัน และความฝันจะเป็นจริงได้ก็ต้องอาศัยความหวังและความพยายาม เฉกเช่นการเจียระไน เพื่อสรรสร้างความฝันนั้นให้เป็นจริง ทัวร์มาลีนของคุณจะกลายเป็นอัญมณีที่ล้ำค่าและถูกเจียระไนเป็นรูปทรงที่ไม่เหมือนใคร เปรียบดั่งผลลัพธ์แห่งความตั้งใจและความพยายามของทุกคนที่จะออกมาสวยงามในรูปแบบของตนเอง\n\nเพียงแค่คุณมีความฝัน ทัวร์มาลีนนั้นก็จะมาอยู่ในครอบครองของคุณ . . .",
  },
];

export const addToDB = async (req, res) => {
  const {
    email,
    role,
    username,
    prefix,
    name,
    surname,
    school,
    classlvl,
    platform,
    purpose,
    environmentKey,
  } = req.body;

  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const id = await userModel.countDocuments({});

    const jsonData = {
      id: id + 1,
      email: email,
      role: role,
      username: username,
      prefix: prefix,
      name: name,
      surname: surname,
      school: school,
      classlvl: classlvl,
      platform: platform,
      purpose: purpose,
    };
    await userModel.create(jsonData);
    return sendResponse(res, 200, "Added to Database Successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const getUser = async (req, res) => {
  const { email, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ email: email });
    return sendResponse(res, 200, !isObjectEmpty(user));
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const getUserInfo = async (req, res) => {
  const { email, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return sendResponse(res, 200, user);
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const registerUser = async (req, res) => {
  const { email, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      user.register = true;
      await user.save();
      return sendResponse(res, 200, "Registered Successfully");
    } else {
      return sendResponse(res, 404, "This user hasn't registered yet.");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const registerUser2 = async (req, res) => {
  const { id, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    if (user) {
      user.register = true;
      await user.save();
      return sendResponse(res, 200, "Registered Successfully");
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const UpdateScore = async (req, res) => {
  const { id, score, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    let gems, gem_desc;

    if (!score) {
      return sendResponse(res, 400, "Invalid Score Field");
    }

    if (user) {
      const matchingGem = gemRanges.find((gem) => range(score, ...gem.range));
      gems = matchingGem ? matchingGem.name : undefined;
      gem_desc = matchingGem ? matchingGem.description : undefined;

      if (!gems) return sendResponse(res, 400, "Gems not found");
      
      user.gems = gems;
      user.gem_desc = gem_desc;

      await user.save();
      return sendResponse(res, 200, "Updated user's gems successfully");
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetGems = async (req, res) => {
  const { id, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    if (user) {
      const jsonData = {
        gems: user.gems,
        gem_desc: user.gem_desc,
      };
      return sendResponse(res, 200, jsonData);
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const AddStaff = async (req, res) => {
  const { id, organizationName, tag, environmentKey } = req.body;

  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    const staff = {
      organizationName: organizationName,
      tag: tag,
    };

    if (user) {
      user.isstaff = true;
      user.staff = staff;
      await user.save();
      return sendResponse(res, 200, "Added to staff successfully");
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetStaffInfo = async (req, res) => {
  const { id, environmentKey } = req.body;

  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    if (user) {
      const staff = {
        isstaff: user.isstaff,
        organizationName: user.organizationName,
        staff: user.staff,
      };
      return sendResponse(res, 200, staff);
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(user);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
