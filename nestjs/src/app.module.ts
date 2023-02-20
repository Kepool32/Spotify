import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModules} from "./file/file.modules";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'




@Module({
    imports:[
        ServeStaticModule.forRoot({
        rootPath: path.resolve('src/static')
    }),MongooseModule.forRoot('mongodb+srv://user:user@cluster0.bg2y3yf.mongodb.net/musick-platform?retryWrites=true&w=majority'),
        TrackModule,
        FileModules]
})
export class AppModule{}