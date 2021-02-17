# web-instant-sdk

## config host
```
10.100.49.89 litesdk.zoomdev.com
10.100.49.89 lsdk.zoomdev.us
10.100.49.89 rwgdev4989.zoomdev.us
```

## Git repostory
git@git.zoom.us:web/web-instant-sdk.git

## run web-instant-sdk sample code
yarn dev -- --module=participant
yarn dev -- --module=video
yarn dev -- --module=audio
yarn dev -- --module=chat
yarn dev -- --module=sharing

## generate doc
npm run build:doc

## znpm publish to @zoom/instantsdk
https://npm.zoomdev.us/package/@zoom/instantsdk

npm run znpm-publish


## markdown use
https://github.com/mixu/markdown-styles
```bash
generate-md --layout mixu-gray --input ./doc --output ./dochtml

```