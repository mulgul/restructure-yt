export const formatViews = (views: number): string => {
	if (views > 1000000) {
		return Math.floor(views / 1000000).toString() + 'M';
	} else if (views > 1000) {
		return Math.floor(views / 1000).toString() + 'K';
	} else {
		return views.toString();
	}
};
