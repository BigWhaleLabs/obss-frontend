# OBSS frontend

Frontend to connect to OBSS.

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Environment variables

| Name                 | Description                                 |
| -------------------- | ------------------------------------------- |
| `VITE_ENCRYPT_KEY`   | Secret key to encrypt local storage         |
| `VITE_APP_NAME`      | App name which is displayed in some wallets |
| `VITE_ETH_NETWORK`   | Eth network for your providers and contract |
| `VITE_ETH_RPC`       | Ethereum node RPC URI                       |
| `VITE_IPFS_UPLOADER` | IPFS uploader URI                           |
| `VITE_OBSS_STORAGE`  | OBSS storage contract address               |

Also, please, consider looking at `.env.sample`.

## Available Scripts

- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn start` — runs the app in the development mode
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`
- `yarn update` — builds the code and pushes it to git remote
