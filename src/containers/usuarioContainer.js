import UserController from "../controllers/userController.js";
import {User, Role} from "../Models/index.js";
import UserService from "../services/userService.js";

const userService= new UserService(User, Role)
const userController= new UserController(userService)

export default userController