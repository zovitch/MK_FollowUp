const fs = require('fs')
const csv = require('csv-parser')

const results = {}

fs.createReadStream('/Users/nico/Desktop/temp.csv')
  .pipe(csv())
  .on('data', (data) => {
    const { id, stencilNumber, lItem_id } = data
    if (!results[id]) {
      results[id] = {
        stencilNumber,
        id,
        lItem_ids: [],
      }
    }
    results[id].lItem_ids.push(lItem_id)
  })
  .on('end', () => {
    const jsonOutput = Object.values(results)
    fs.writeFileSync('output.json', JSON.stringify(jsonOutput, null, 2))
    console.log('JSON file has been created')
  })
