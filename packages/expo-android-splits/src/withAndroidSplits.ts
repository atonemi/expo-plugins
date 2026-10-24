import { withAppBuildGradle } from "expo/config-plugins";
import type { ConfigPlugin } from "expo/config-plugins";

export interface PluginOptions {}

const withAndroidSplits: ConfigPlugin = (config) => {
  return withAppBuildGradle(config, (config) => {
    const buildGradle = config.modResults.contents;

    const splitsConfig = `
    splits {
        abi {
            enable System.getenv('ENABLE_ABI_SPLITS') == 'true'
            reset()
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
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
