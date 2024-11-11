import VelcroComponent from "./components/velcro/index.js";
import VelcroModifier from "./modifiers/velcro.js";
interface Registry {
    Velcro: typeof VelcroComponent;
    velcro: typeof VelcroModifier;
}
export { Registry as default };
//# sourceMappingURL=template-registry.d.ts.map