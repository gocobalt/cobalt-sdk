import { Base } from "./base";
import { Apis } from "./Apis";
import { applyMixins } from "./utils";

class Cobalt extends Base {}
interface Cobalt extends Apis {}

applyMixins(Cobalt, [Apis]);

export default Cobalt;