const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  id_usuario: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  nombre_usuario: {
    type: String,
    required: true,
    trim: true
  },
  cargo_usuario: {
    type: String,
    trim: true
  },
  tipo_usuario: {
    type: String,
    enum: ["admin", "usuario"],
    default: "usuario"
  },
  correo_usuario: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  telefono_usuario: {
    type: String,
    trim: true
  },
  dependencia: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  observacion_usuario: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

//  ENCRIPTAR PASSWORD
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//  VALIDAR PASSWORD
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

//  OCULTAR PASSWORD EN RESPUESTAS (MUY PRO)
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const ModeloUsuario = mongoose.model("Usuario", userSchema, "Usuario");

module.exports = ModeloUsuario;