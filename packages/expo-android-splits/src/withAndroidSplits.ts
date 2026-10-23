import { withAppBuildGradle } from "expo/config-plugins";
import type { ConfigPlugin } from "expo/config-plugins";

export interface PluginOptions {
  buildArchs?: string[];
}

const withAndroidSplits: ConfigPlugin<PluginOptions> = (config, { buildArchs }) => {
  return withAppBuildGradle(config, (config) => {
    const buildGradle = config.modResults.contents;
    const includes =
      buildArchs && buildArchs.length > 0
        ? buildArchs
        : ["armeabi-v7a", "arm64-v8a", "x86", "x86_64"];

    const splitsConfig = `
    splits {
        abi {
            enable true
            reset()
            include ${includes.map((abi) => `"${abi}"`).join(", ")}
            universalApk false
        }
    }
`;

    if (!buildGradle.includes("splits {")) {
      config.modResults.contents = buildGradle.replace(/android\s*{/, `android {\n${splitsConfig}`);
    }

    return config;
  });
};

export default withAndroidSplits;
