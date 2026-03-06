import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';

export class Post extends Model<
  InferAttributes<Post>,
  InferCreationAttributes<Post>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare excerpt: string | null;
  declare image: string | null;
  declare tags: string[] | null;
  declare userId: number;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    excerpt: DataTypes.STRING(500),
    image: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'posts'
  }
);

// relaciones
Post.belongsTo(User, { as: 'user', foreignKey: 'userId' });
User.hasMany(Post, { as: 'posts', foreignKey: 'userId' });
