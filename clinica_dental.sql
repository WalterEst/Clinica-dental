  -- Tabla: paciente
  CREATE TABLE paciente (
    id_paciente INT NOT NULL AUTO_INCREMENT,
    rut CHAR(12) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE DEFAULT NULL,
    telefono VARCHAR(15) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    direccion VARCHAR(200) DEFAULT NULL,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_paciente),
    KEY idx_paciente_nombre (nombre, apellido)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: tratamiento
CREATE TABLE tratamiento (
  id_tratamiento INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  derecho DECIMAL(10,2) DEFAULT NULL,
  costo_base DECIMAL(20,2) DEFAULT NULL,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_tratamiento),
  KEY idx_tratamiento_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: paciente_tratamiento
CREATE TABLE paciente_tratamiento (
  id_p_tratamiento INT NOT NULL AUTO_INCREMENT,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE DEFAULT NULL,
  descripcion TEXT,
  monto_aplicado DECIMAL(10,2) DEFAULT NULL,
  id_paciente INT NOT NULL,
  id_tratamiento INT NOT NULL,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_p_tratamiento),
  KEY id_paciente (id_paciente),
  KEY id_tratamiento (id_tratamiento),
  KEY idx_pac_trat_fechas (fecha_inicio, fecha_fin),
  CONSTRAINT paciente_tratamiento_ibfk_1 FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE,
  CONSTRAINT paciente_tratamiento_ibfk_2 FOREIGN KEY (id_tratamiento) REFERENCES tratamiento (id_tratamiento) ON DELETE RESTRICT,
  CONSTRAINT chk_fechas_validas CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: cita
CREATE TABLE cita (
  id_cita INT NOT NULL AUTO_INCREMENT,
  fecha_hora DATETIME NOT NULL,
  duracion_minutos INT NOT NULL DEFAULT 30 COMMENT 'Duración en minutos',
  estado ENUM('programada', 'completada', 'cancelada', 'no_asistio') DEFAULT 'programada',
  id_paciente INT NOT NULL,
  id_p_tratamiento INT DEFAULT NULL,
  observaciones TEXT,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_cita),
  KEY id_paciente (id_paciente),
  KEY id_p_tratamiento (id_p_tratamiento),
  KEY idx_cita_fecha (fecha_hora),
  KEY idx_cita_estado (estado),
  CONSTRAINT cita_ibfk_1 FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE,
  CONSTRAINT cita_ibfk_2 FOREIGN KEY (id_p_tratamiento) REFERENCES paciente_tratamiento (id_p_tratamiento) ON DELETE SET NULL,
  CONSTRAINT chk_duracion_positiva CHECK (duracion_minutos > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: historial_medico
CREATE TABLE historial_medico (
  id_historial INT NOT NULL AUTO_INCREMENT,
  descripcion TEXT NOT NULL,
  id_paciente INT NOT NULL,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_historial),
  KEY id_paciente (id_paciente),
  CONSTRAINT historial_medico_ibfk_1 FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: pagos
CREATE TABLE pagos (
  id_pago INT NOT NULL AUTO_INCREMENT,
  id_p_tratamiento INT NOT NULL,
  fecha_pago DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  monto DECIMAL(10,2) NOT NULL,
  metodo_pago ENUM('Efectivo', 'Tarjeta', 'Transferencia') NOT NULL,
  referencia VARCHAR(50) DEFAULT NULL,
  estado ENUM('Pendiente', 'Completado', 'Rechazado') DEFAULT 'Pendiente',
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_pago),
  KEY id_p_tratamiento (id_p_tratamiento),
  KEY idx_pago_fecha (fecha_pago),
  CONSTRAINT pagos_ibfk_1 FOREIGN KEY (id_p_tratamiento) REFERENCES paciente_tratamiento (id_p_tratamiento) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: personal
CREATE TABLE personal (
  id_personal INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  rut CHAR(12) DEFAULT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(15) DEFAULT NULL,
  rol ENUM('doctor', 'recepcionista', 'administrativo') NOT NULL,
  activo TINYINT(1) DEFAULT 1,
  fecha_ingreso DATE DEFAULT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_personal),
  UNIQUE KEY email (email),
  UNIQUE KEY rut (rut),
  KEY idx_personal_nombre (nombre, apellido),
  KEY idx_personal_rol (rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: radiografia
CREATE TABLE radiografia (
  id_radiografia INT NOT NULL AUTO_INCREMENT,
  fecha_toma DATETIME NOT NULL,
  tipo VARCHAR(20) DEFAULT NULL,
  archivo VARCHAR(250) DEFAULT NULL COMMENT 'Ruta del archivo o nombre',
  observaciones TEXT,
  id_paciente INT NOT NULL,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_radiografia),
  KEY id_paciente (id_paciente),
  KEY idx_radio_fecha (fecha_toma),
  CONSTRAINT radiografia_ibfk_1 FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla: paciente
INSERT INTO paciente VALUES 
(1, '11111111-1','Ana','Rojas','1990-05-12','987654321','ana.rojas@gmail.com','Av. Libertad 123','2025-05-17 18:58:00'),
(2, '22222222-2','Luis','Martínez','1985-09-30','976543210','luis.martinez@gmail.com','Calle Sur 456','2025-05-17 18:58:00');

-- Tabla: tratamiento
INSERT INTO tratamiento VALUES 
(1,'Limpieza Dental','Limpieza profesional con ultrasonido',10000.00,25000.00,'2025-05-17 18:58:14'),
(2,'Extracción Molar','Extracción de muela con anestesia local',15000.00,45000.00,'2025-05-17 18:58:14');

-- Tabla: paciente_tratamiento
INSERT INTO paciente_tratamiento VALUES 
(1,'2025-05-01',NULL,'Limpieza dental preventiva',25000.00,'1',1,'2025-05-17 18:58:33'),
(2,'2025-05-03',NULL,'Extracción de molar superior derecha',45000.00,'2',2,'2025-05-17 18:58:33');

-- Tabla: cita
INSERT INTO cita VALUES 
(1,'2025-05-20 10:00:00',30,'programada','1',NULL,'Evaluación inicial sin tratamiento definido','2025-05-17 18:59:41','2025-05-17 18:59:41'),
(2,'2025-05-21 11:00:00',30,'programada','2',2,'Control post extracción molar','2025-05-17 18:59:56','2025-05-17 18:59:56');

-- Tabla: historial_medico
INSERT INTO historial_medico VALUES 
(1,'Paciente sin enfermedades sistémicas, sin alergias.','1','2025-05-17 18:59:20'),
(2,'Hipertensión controlada, antecedentes familiares de diabetes.','2','2025-05-17 18:59:20');

-- Tabla: pagos
INSERT INTO pagos VALUES 
(1,1,'2025-05-02 10:30:00',25000.00,'tarjeta','TARJ-001','completado','2025-05-17 18:58:51'),
(2,2,'2025-05-04 11:00:00',45000.00,'efectivo','EF-002','completado','2025-05-17 18:58:51');

-- Tabla: personal
INSERT INTO personal VALUES 
(1,'María','González','12345678-9','maria.gonzalez@clinicadental.cl','912345678','doctor',1,'2023-01-10','2025-05-17 18:57:42','2025-05-17 18:57:42'),
(2,'Pedro','López','98765432-1','pedro.lopez@clinicadental.cl','976543210','recepcionista',1,'2024-03-15','2025-05-17 18:57:42','2025-05-17 18:57:42');

-- Tabla: radiografia
INSERT INTO radiografia VALUES 
(1,'2025-04-28 09:00:00','panorámica','rad_pano_ana.jpg','Todo normal','1','2025-05-17 18:59:07'),
(2,'2025-04-29 14:00:00','bitewing','rad_bite_luis.jpg','Caries visibles','2','2025-05-17 18:59:07');
