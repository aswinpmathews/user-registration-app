export const style = (barHeight : number) => ({
                  width: 40,
                  height: `${barHeight*2}px`,
                  bgcolor: '#1a71d4ff',
                  borderRadius: 5,
                  position: 'relative',
                })
export const countStyle = {position: 'absolute',top: '10px',left: '50%',transform: 'translateX(-50%)',color: 'white',fontWeight: 'bold'}
export const titleStyle = {justifyContent: 'center',display: 'flex',mb: 4,fontSize: '2rem',fontWeight: 'bold',fontFamily: 'noto-sans'}
export const sheetStyle = {padding: 10,borderRadius: 'md',boxShadow: 'md',maxWidth: 600,margin: 'auto',mt: 5,mb: 5,}