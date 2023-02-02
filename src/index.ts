import Logger from "./utils/Logger";

const logger = new Logger()
export default class MypandaSDK {
	constructor(){}
	print(){
		logger.info('hello')
	}
}