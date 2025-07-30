import path from "path";
import { fileURLToPath } from "url";

const getFilePath = (metaUrl) => {
  const __dirname = path.dirname(fileURLToPath(metaUrl));
  return __dirname;
};

export default getFilePath;
