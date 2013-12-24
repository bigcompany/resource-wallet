var currency = {
  "type": {
    "type": "string",
    "required": true
  },
  "amount": {
    "type": "string",
    "required": true
  }
};

module['exports'] = {
  "description": "provides a digital wallet API",
  "type": "wallet",
  "properties": {
    "owner": "string",
    "status": {
      "type": "string",
      "enum": ['new', 'active', 'disabled', 'locked'],
      "default": "new"
    },
    "receivingAddresses": {
      "type": "object",
      "properties": {
        "publicKey": {
          "type": "string",
          "required": true,
          "minLength": 5
        }
      }
    },
    "currencies": {
      "type": "object",
      "properties": currency
    }
  },
  "methods": {
    "deposit": {
      "input": {
        "id": {
          "type": "any",
          "required": true
        },
        "currency": currency.type,
        "amount": currency.amount
      },
      "output": {
        "status": "function"
      }
    },
    "withdraw": {
      "input": {
        "id": {
          "type": "any",
          "required": true
        },
        "currency": currency.type,
        "amount": currency.amount
      },
      "output": "function"
    },
    "lock": {
      "description": "locks wallet from any further withdrawls",
      "input": "function",
      "output": "function"
    },
    "unlock": {
      "description": "unlocks wallet allowing withdrawls",
      "input": "function",
      "output": "function"
    },
    "generateAddress": {
      "input": {
        "id": {
          "type": "any",
          "required": true
        },
        "owner": {
          "type": "string",
          "required": true
        },
        "type": {
          "type": "string",
          "required": true
        }
      }
    }
  }
};