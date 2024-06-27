import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'

function splitString(string: string) {
	return string.split(' ')
}

export default function checkAuth(req: Request, res: Response, next: NextFunction) {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: "Authentification Failed, no auth header" })
	} else {
		const [tokenType, token] = splitString(req.headers.authorization)

		if (token && tokenType === 'Bearer') {
			const secret: any = process.env.JWT_SECRET
			jwt.verify(token, secret, (err: any, decodedToken: any) => {
				if (err) {
					return res
						.status(401)
						.json({ message: "Authentification Failed, try logging in again" })
				} else {
					res.locals.user = decodedToken.id
					next()
				}
			})
		}
	}
}