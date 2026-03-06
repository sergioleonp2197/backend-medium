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

export class Comment extends Model<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare userId: number;
  declare postId: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'comments'
  }
);

// relaciones
Comment.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

Post.hasMany(Comment, { as: 'comments', foreignKey: 'postId' });
User.hasMany(Comment, { foreignKey: 'userId' });
