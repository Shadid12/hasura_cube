cube(`Fraud`, {
  sql: `SELECT * FROM public.fraud`,
  preAggregations: {
    main: {
      measures: [Fraud.count],
      dimensions: [Fraud.isflaggedfraud, Fraud.isfraud, Fraud.type, Fraud.amount]
    }
  },
  joins: {},
  measures: {
    count: {
      type: `count`,
      drillMembers: [nameorig, namedest]
    }
  },
  dimensions: {
    type: {
      sql: `type`,
      type: `string`
    },
    nameorig: {
      sql: `${CUBE}."nameOrig"`,
      type: `string`
    },
    oldbalanceorg: {
      sql: `${CUBE}."oldbalanceOrg"`,
      type: `string`
    },
    newbalanceorig: {
      sql: `${CUBE}."newbalanceOrig"`,
      type: `string`
    },
    namedest: {
      sql: `${CUBE}."nameDest"`,
      type: `string`
    },
    isfraud: {
      sql: `${CUBE}."isFraud"`,
      type: `string`
    },
    isflaggedfraud: {
      sql: `${CUBE}."isFlaggedFraud"`,
      type: `string`
    },
    amount: {
      sql: `${CUBE}."amount"`,
      type: `number`
    }
  }
});