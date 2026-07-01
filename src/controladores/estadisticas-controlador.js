import EstadisticasServicio from "../servicios/estadisticas-servicio.js";

import PDFDocument from "pdfkit";

export default class EstadisticasControlador {

    constructor() {

        this.estadisticas = new EstadisticasServicio();
    }

    /*
    |--------------------------------------------------------------------------
    | OBTENER ESTADÍSTICAS
    |--------------------------------------------------------------------------
    */
    obtenerTurnos = async (req, res) => {

        try {

            const datos = await this.estadisticas.obtenerTurnos();

            res.status(200).json({
                estado: true,
                datos
            });

        } catch(error) {

            console.error(error);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno"
            });
        }
    }

    /*
    |--------------------------------------------------------------------------
    | GENERAR PDF
    |--------------------------------------------------------------------------
    */
    generarPDF = async (req, res) => {

        try {

            const datos = await this.estadisticas.obtenerTurnos();

            const doc = new PDFDocument();

            res.setHeader(
                'Content-Type',
                'application/pdf'
            );

            res.setHeader(
                'Content-Disposition',
                'inline; filename=estadisticas.pdf'
            );

            doc.pipe(res);

            /*
            |--------------------------------------------------------------------------
            | TÍTULO
            |--------------------------------------------------------------------------
            */
            doc
                .fontSize(20)
                .text('Estadísticas de Turnos por Especialidad', {
                    align: 'center'
                });

            doc.moveDown(2);

            /*
            |--------------------------------------------------------------------------
            | DATOS
            |--------------------------------------------------------------------------
            */
            doc.fontSize(12);

            if (datos && datos.length > 0) {
                datos.forEach((item) => {
                    const especialidad = item.especialidad || 'Sin nombre';
                    const turnos = item.cantidad_turnos !== undefined ? item.cantidad_turnos : 0;
                    const facturacion = item.facturacion_total !== undefined ? item.facturacion_total : 0;

                    doc.text(
                        `Especialidad: ${especialidad} | Turnos del mes anterior: ${turnos} | Facturación: $${facturacion}`
                    );
                    doc.moveDown(0.5);
                });
            } else {
                doc.text('No se encontraron datos estadísticos para mostrar.');
            }

            doc.end();

            } catch(error) {

                console.error("Error exacto en la generación del PDF:", error);

                res.status(500).json({
                    estado: false,
                    mensaje: "Error al generar PDF"
                });
            }
    }
}
