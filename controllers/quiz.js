import userModel from "../models/userModel.js";
import { CheckEnvironmentKey, sendResponse } from "../utils/util.js";

const range = (x, min, max) => {
  return x >= min && x <= max;
};

const gemRanges = [
  {
    range: [44, 54],
    name: "แอเมทิสต์",
    description:
      "“แอเมทิสต์” อัญมณีแห่งความฝัน\nของผู้ถือคติของความเรียบง่าย\nและสะดวกสบาย แต่มีความโดดเด่นเป็นเฉพาะ\nสีสันที่เฉพาะตัวของอัญมณีแอเมทิสต์นั้นแสนสวยงาม\nเมื่อถูกประดับลงบนตัวแล้วจะประกายตาเมื่อมอง\nมีสีสันออกมาให้เห็นชัดเจน\nผดุงไว้ซึ่งชัยชนะในท่ามกลางผู้คนมากมาย",
  },
  {
    range: [40, 43],
    name: "บุษราคัม",
    description:
      "“บุษราคัม” อัญมณีแห่งโชคลาภ ความสำเร็จที่ไม่มีวันโรยรา\nเปรียบเสมือนคำพูดที่ว่า “destiny is destined by you”\nมีเพียงคุณเท่านั้นที่เป็นผู้ลิขิตได้! ไม่ว่าจะเจอเรื่องหนักหนาเพียงใด\nเพียงเชื่อมั่นกับตัวเอง “ฉันทำได้”\nไม่มีสิ่งใดจะพรากคุณจากความฝันไปได้\nแล้วตัวคุณจะดึงดูดสิ่งดี ๆ เข้ามาหาคุณเอง\nเมื่อหัวใจของคุณสู้ พร้อมกับใช้หัวใจนำทาง\nโชคชะตาจะนำพาความสำเร็จมาให้คุณเอง",
  },
  {
    range: [37, 39],
    name: "ไข่มุก",
    description:
      "“ไข่มุก” ตัวแทนความบริสุทธิ์ผุดผ่อง นุ่มนวล สงบสุข\nและอ่อนหวานที่เป็นของขวัญจากท้องทะเลกว้างใหญ่\nและด้วยความบริสุทธิ์ของไข่มุกสามารถช่วยรักษาสมดุลของ\nอารมณ์ที่แปรปรวนไร้ความมั่นคงได้\nช่วยให้มีความอ่อนโยนและนุ่มนวล\nแต่ยังมั่นคงแข็งแกร่ง\nยืนหยัดเพื่อตนเองอยู่เสมอ\nเปรียบเสมือนภายนอกที่มีความอ่อนหวานบริสุทธิ์\nแต่ก็มีความมุ่งมั่นตั้งใจและรักที่จะไขว่คว้าเป้าหมายที่ตน\nปรารถนาอย่างไม่ลดละ",
  },
  {
    range: [35, 36],
    name: "โทแพซ",
    description:
      "“โทแพซ” อัญมณีแห่งความโชคดี\nเป็นอัญมณีที่มีความหมายอย่างหลากหลาย\nโดยมักจะสื่อถึงความแข็งแกร่งทางร่างกายและจิตใจ\nรวมถึงความมีชีวิตชีวา\nการมีความคิดสร้างสรรค์และแรงบันดาลใจเป็นเลิศ\nมีความสงบทางอารมณ์ ช่วยในการชี้แนะจุดมุ่งหมาย\nและยังส่งเสริมเรื่องของความเข้าใจลึกลงไปของจิตใจอีกด้วย",
  },
  {
    range: [33, 34],
    name: "ทับทิม",
    description:
      "“ทับทิม” มณีที่พ้องกับชื่อผลไม้นี้\nไม่ได้เป็นเพียงอัญมณีของความรักและอำนาจ\nแต่อัญมณีล้ำค่านี้ยังเป็นแสงสว่างให้ผู้เดินทาง\nคอยเปล่งแสงสีแดงแห่งชีวิต\nปัดเป่าสิ่งชั่วร้ายและโรคภัยให้ไม่สามารถทำอันตรายได้\nอัญมณีสีชาดนี้จะปกป้องและดลบันดาลความสำเร็จ\nแก่ผู้ที่ครอบครองด้วยความพยายามที่มอดไหม้ร้อนแรง\nดังเปลวประกายเพลิงนี้",
  },
  {
    range: [31, 32],
    name: "เพทาย",
    description:
      "“เพทาย” อัญมณีสีฟ้าสง่าน่าเกรงขาม\nเป็นที่รู้จักและแพร่หลายมาอย่างยาวนาน\nเป็นอัญมณีแห่งความโชคดี\nและสัญลักษณ์แห่งความฉลาด\nเครื่องรางป้องกันความชั่วร้ายและก้าวไปสู่ความสำเร็จ\nดึงดูดผู้ที่มีความใฝ่ฝัน\nกล้าที่จะเดินตามความฝันและมุ่งมั่นที่จะทำฝันนั้นให้เป็นจริง",
  },
  {
    range: [26, 30],
    name: "ไพลิน",
    description:
      "“ไพลิน” อัญมณีสีนํ้าเงินแกมม่วงหรือนํ้าเงินสด\nมีประกายแวววาวที่จะพาคุณเปล่งประกายระยิบระยับไปกับความฝัน\nของตัวเอง ไพลินจะเป็นตัวช่วยให้คุณมีสมาธิแน่วแน่\nปกป้องภัยร้ายและช่วยให้ประสบความสำเร็จ\nพร้อมค้นหาความเป็นตัวของตัวเองเสมือน\nไพลินหลากหลายรูปแบบที่ถูกค้นพบ\nและนิยามความหมายไว้ต่างกันตามแหล่งที่เจอ",
  },
  {
    range: [8, 25],
    name: "ทัวร์มาลีน",
    description:
      "“ทัวร์มาลีน” เปรียบดั่งความฝันอันแสนสวยงามในโลกแห่งอัญมณี\nทุกคนล้วนมีความฝัน และความฝันจะเป็นจริงได้\nก็ต้องอาศัยความหวังและความพยายาม เฉกเช่นการเจียระไน\nเพื่อสรรสร้างความฝันนั้นให้เป็นจริง\nทัวร์มาลีนของคุณจะกลายเป็นอัญมณีที่ล้ำค่า\nและถูกเจียระไนเป็นรูปทรงที่ไม่เหมือนใคร\nเปรียบดั่งผลลัพธ์แห่งความตั้งใจและความพยายามของทุกคน\nที่จะออกมาสวยงามในรูปแบบของตนเอง\n“เพียงแค่คุณมีความฝัน\nทัวร์มาลีนนั้นก็จะมาอยู่ในครอบครองของคุณ”",
  },
];

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
