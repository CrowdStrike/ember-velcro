import VelcroComponent from "./components/velcro/index";
import VelcroModifier from "./modifiers/velcro";
interface Registry {
    Velcro: typeof VelcroComponent;
    velcro: typeof VelcroModifier;
}
export { Registry as default };
