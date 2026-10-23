import type { PluginOptions as Props } from "./withAndroidSplits";

export default (props: Props = {}): [string, Props] => ["expo-android-splits", props];
