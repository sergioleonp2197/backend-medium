import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes
} from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';
import { Post } from './post.model';

export class Like extends Model<
  InferAttributes<Like>,
  InferCreationAttributes<Like>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare postId: number;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'likes'
  }
);

Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

Post.hasMany(Like, { as: 'likes', foreignKey: 'postId' });
User.hasMany(Like, { foreignKey: 'userId' });
