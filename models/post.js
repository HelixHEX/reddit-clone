import {Schema, model} from 'mongoose';

const postSchema = new Schema({
  title: {type: String, required: true},
  url: {type: String, required: true},
  summary: {type: String, required: true},
})

export default model('Post', postSchema)