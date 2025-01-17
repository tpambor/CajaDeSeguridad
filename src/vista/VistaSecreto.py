from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *

from functools import partial


class VistaSecreto(QWidget):
    #Ventana de elemento logitn

    def __init__(self, principal, claves_favoritas):
        """
        Constructor de la ventana
        """
        super().__init__()

        self.titulo = 'Caja de seguridad - Secreto'
        self.setAttribute(Qt.WA_DeleteOnClose)

        self.interfaz=principal
        self.claves = claves_favoritas

        self.width = 500
        self.height = 500
        self.inicializar_GUI()
        self.show()


    def inicializar_GUI(self):

        # inicializamos la ventana
        self.setWindowTitle(self.titulo)
        self.setFixedSize(self.width, self.height)
        self.setWindowIcon(QIcon("src/recursos/cajaDeSeguridadLogo.png"))

        self.distribuidor_base = QVBoxLayout(self)

        self.widget_secreto = QWidget()
        self.distribuidor_secreto = QGridLayout()
        self.widget_secreto.setLayout(self.distribuidor_secreto)
        self.distribuidor_base.addWidget(self.widget_secreto, Qt.AlignTop)
        numero_fila = 0

        # Iniccializamos los campos de formulario

        etiqueta_nombre=QLabel("Nombre del secreto")
        self.distribuidor_secreto.addWidget(etiqueta_nombre, numero_fila, 0)

        self.texto_nombre=QLineEdit(self)
        self.distribuidor_secreto.addWidget(self.texto_nombre, numero_fila, 1)
        numero_fila=numero_fila+1

        etiqueta_secreto=QLabel("El secreto")
        self.distribuidor_secreto.addWidget(etiqueta_secreto, numero_fila, 0)

        self.texto_secreto=QTextEdit(self)
        self.texto_secreto.setMinimumHeight(150)
        self.distribuidor_secreto.addWidget(self.texto_secreto, numero_fila, 1)
        numero_fila=numero_fila+1



        etiqueta_clave=QLabel("Clave favorita")
        self.distribuidor_secreto.addWidget(etiqueta_clave, numero_fila, 0)

        self.combobox_claves = QComboBox(self)
        for clave in self.claves:
            self.combobox_claves.addItem(clave["nombre"])
        self.combobox_claves.setCurrentIndex(0)
        self.distribuidor_secreto.addWidget(self.combobox_claves, numero_fila, 1, 1, 2)


        btn_ver_clave = QPushButton("", self)
        btn_ver_clave.setToolTip("Ver clave")
        btn_ver_clave.setFixedSize(40, 40)
        btn_ver_clave.setIcon(QIcon("src/recursos/002-eye-variant-with-enlarged-pupil.png"))
        btn_ver_clave.clicked.connect(partial(self.mostrar_clave_favorita))
        btn_ver_clave.setEnabled(len(self.claves) != 0)
        self.distribuidor_secreto.addWidget(btn_ver_clave, numero_fila, 4, Qt.AlignCenter)
        numero_fila=numero_fila+1

        etiqueta_notas=QLabel("Notas")
        self.distribuidor_secreto.addWidget(etiqueta_notas, numero_fila, 0)

        self.texto_notas = QTextEdit(self)
        self.texto_notas.setMinimumHeight(100)
        self.distribuidor_secreto.addWidget(self.texto_notas, numero_fila, 1)
        numero_fila=numero_fila+1

        #Creación de la caja con los botones
        self.widget_botones = QWidget()
        self.distribuidor_botones = QGridLayout()
        self.widget_botones.setLayout(self.distribuidor_botones)
        self.distribuidor_base.addWidget(self.widget_botones, Qt.AlignTop)

       #Creación de los botones con las diferentes operaciones
        self.btn_volver = QPushButton("Volver", self)
        self.btn_volver.setFixedSize(150, 40)
        self.btn_volver.setToolTip("Volver")
        self.btn_volver.setIcon(QIcon("src/recursos/007-back-button.png"))
        self.distribuidor_botones.addWidget(self.btn_volver, 0, 0, Qt.AlignCenter)
        self.btn_volver.clicked.connect(self.volver)

        self.btn_guardar_secreto = QPushButton("Guardar secreto", self)
        self.btn_guardar_secreto.setFixedSize(150, 40)
        self.btn_guardar_secreto.setToolTip("Guardar secreto")
        self.btn_guardar_secreto.setIcon(QIcon("src/recursos/floppy-disk.png"))
        self.distribuidor_botones.addWidget(self.btn_guardar_secreto, 0, 2, Qt.AlignCenter)
        self.btn_guardar_secreto.clicked.connect(self.guardar_cambios)

    def mostrar_secreto(self, elemento):
        self.elemento=elemento
        if (self.elemento!=None):
            self.texto_nombre.setText(self.elemento["nombre_elemento"])
            self.texto_secreto.setText(self.elemento["secreto"])
            indice_clave = self.combobox_claves.findText(self.elemento["clave"])
            self.combobox_claves.setCurrentIndex(indice_clave)
            self.texto_notas.setText(str(self.elemento["notas"]))

    def volver(self):
        """
        Esta función permite volver a la lista de elementos
        """
        self.hide()
        self.interfaz.mostrar_vista_lista_elementos()

    def guardar_cambios(self):
        """
        Esta función guarda los cambios al elemento tipo secreto (editando o guardando los nuevos login)
        """
        resultado = self.interfaz.guardar_secreto(self.texto_nombre.text(), self.texto_secreto.toPlainText(), self.combobox_claves.currentText(), \
                                      self.texto_notas.toPlainText())
        if  resultado == "":
            self.hide()
            self.interfaz.mostrar_vista_lista_elementos()
        else:
            self.error_secreto(resultado)

    def mostrar_clave_favorita(self):
        """
        Esta función solicita mostrar la clave asociada a la clave favorita seleccionada
        """
        self.interfaz.mostrar_clave_favorita(self, self.combobox_claves.currentText())

    def error_secreto(self, error):
        mensaje_error=QMessageBox()
        mensaje_error.setIcon(QMessageBox.Question)
        mensaje_error.setText("Error: " + error)
        mensaje_error.setWindowTitle("Error al guardar")
        mensaje_error.setWindowIcon(QIcon("src/recursos/cajaDeSeguridadLogo.png"))
        mensaje_error.setStandardButtons(QMessageBox.Ok )
        respuesta=mensaje_error.exec_()

    def closeEvent(self, event):
        self.hide()
        self.interfaz.mostrar_vista_lista_elementos()
        event.accept()