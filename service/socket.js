import io from "socket.io-client";
import { v4 } from "uuid";

export const socket = io("https://www.branchaid.com/",{path: '/ws/'});
