import 'dotenv/config'
import { IEnv } from '@/interfaces'

const env: IEnv = {
                                                                                                                        APP: {
                                                                                                                                                                                                                                                PORT:
                                                                                                                                                                                                                                                                                                                                                                        process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .env
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .APP_PORT ||
                                                                                                                                                                                                                                                                                                                                                                        3000,
                                                                                                                                                                                                                                                HOSTNAME:
                                                                                                                                                                                                                                                                                                                                                                        process
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .env
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .APP_HOST ||
                                                                                                                                                                                                                                                                                                                                                                        '',
                                                                                                                        },
}

export default env
