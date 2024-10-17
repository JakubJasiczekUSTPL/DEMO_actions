const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = srv => {

    srv.on('chooseApprover', async req => {
        
        let value = req.data.value
        
         // Ścieżka do pliku CSV
         const csvFilePath = path.join(__dirname, '../db/data/demo.actions.Approver.csv');

         // Przetwarzanie pliku CSV i znalezienie odpowiedniego emaila
         const result = await findApprover(value, csvFilePath);

        return result;
    });

    function findApprover(value, csvFilePath) {
        return new Promise((resolve, reject) => {
            const approvers = [];
            
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    approvers.push(row); // Dodajemy każdy wiersz do listy
                })
                .on('end', () => {
                    // Znajdź odpowiedniego approvera na podstawie wartości
                    for (let approver of approvers) {
                        if (value < approver.value_limit) {
                            return resolve(approver.email);
                        }
                    }
                    // Jeśli żaden approver nie zostanie znaleziony, zwróć domyślną wartość 'none'
                    resolve('none');
                })
                .on('error', reject);
        });
    };
 }

