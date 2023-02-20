import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./schema/track.shema";
import {Model, ObjectId} from "mongoose";
import {Comment, CommentsDocument} from "./schema/coments.schema";
import {CreateTrackDto} from "./dto/create-track-dto";
import {CreateCommentDto} from "./dto/create-comment-dto";
import {FileService, FileType} from "../file/file.service";


@Injectable()
export class TrackService{

    constructor(@InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private CommentModel: Model<CommentsDocument>,
                private FileService:FileService)
    {}

    async create(dto:CreateTrackDto,picture,audio): Promise<Track>{
        const AudioPath=this.FileService.createFile(FileType.AUDIO, audio)
        const PicturePath=this.FileService.createFile(FileType.IMAGE, picture)
        const track=await this.TrackModel.create({...dto,listens:0,audio:AudioPath,picture:PicturePath})
        return track
    }

    async getAll(count={},offset=0):Promise<Track[]>{
        const tracks=await this.TrackModel.find().skip(Number(offset)).limit(Number(count));
        return tracks
    }

    async getOne(id:ObjectId):Promise<Track>{

        const track=await this.TrackModel.findById(id).populate('comments');
        return track
    }

    async delete(id:ObjectId):Promise<ObjectId>{
        const track=await this.TrackModel.findByIdAndDelete(id);
        return track.id

    }

    async addComment(dto:CreateCommentDto):Promise<Comment>{
        const track=await this.TrackModel.findById(dto.trackid);
        const comment=await this.CommentModel.create({...dto})
        track.comments.push(comment.id)
        await track.save();
        return comment
    }


    async listen(id: ObjectId) {
        const track=await this.TrackModel.findById(id)
        track.listens+=1
        track.save()
        
    }

    async search(query: string):Promise<Track[]>{

        const tracks=await this.TrackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })

        return tracks

    }

  /*  async findAll(page: number, limit: number): Promise<Track[]> {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const items = await this.TrackModel
            .find()
            .skip(startIndex)
            .limit(limit)
            .exec();

        const totalItems = await this.TrackModel.countDocuments().exec();

        return {
            items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
        };
    }*/
}