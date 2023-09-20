const Footer = () => {
	return (
		<div className="bg-gray-100 flex items-center justify-center py-4">
			<p className="text-gray-600">
				Copyright &copy; {new Date().getFullYear()} | All Right
				Reserved.
			</p>
		</div>
	);
};

export default Footer;
