import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchemas = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  career: String,
  password: String,

  // Accepts any plain object
  profile: {
    type: Schema.Types.Mixed,
    default: {}
  },

  // Accepts any array (you can restrict further if needed)
  journal: {
    type: [
      {
        chat_id: String,
        messages: {
          type: [
            {
              sender: String,
              message: String,
              links: {
                type: [String],
                default: []
              },
              files: {
                type: [String],
                default: []
              }
            }
          ]
        }
      }
    ]
  }
});

export default userSchemas;