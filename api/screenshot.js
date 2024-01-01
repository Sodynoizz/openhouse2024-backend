import { ScreenShot } from "../controllers/screenshot.js"

export default async function handler(request, response) {
  return await ScreenShot(request, response);
}
