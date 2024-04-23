# Nginx 설정
FROM nginx:stable-alpine

ENV REACT_APP_API_URL=/api/

# 로컬에서 빌드된 React 앱을 Nginx에 복사
COPY ./build /usr/share/nginx/html

# Nginx 설정 파일 추가
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
