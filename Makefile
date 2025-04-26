.PHONY: backend mobile start stop

# Start backend
backend:
	cd backend && uvicorn app.main:app --reload

# Start mobile app (assuming Expo for React Native)
mobile:
	cd mobile && npx expo start -c

# Start both backend and mobile in parallel
start:
	make -j 2 backend mobile

# Stop backend and mobile (optional if you want to make it fancier later)
stop:
	pkill -f "uvicorn app.main:app" || true
	pkill -f "expo" || true
