// �й� : 12161550
// ���� : ������

#include <iostream>
#include <string>
#include <random>
using namespace std;

class Soldier {
private:
	string name = "";
	int grade = 0; // 1 : �̵, 2 : �Ϻ�, 3 : ��, 4 : ����
	string hobby = "";

public:
	Soldier();
	Soldier(const string& name, int grade, const string& hobby);
	Soldier(const Soldier& std);
	~Soldier();

	string getName() const {
		return name;
	}
	int getGrade() const {
		return grade;
	}
	string getHobby() const {
		return hobby;
	}

	static int soldier_count;
	static void PrintSoldierCount();
};
Soldier::Soldier() { // default ������
	soldier_count++;
}
Soldier::~Soldier() { // �Ҹ���
	if (name == "������")
		cout << name << "�Ǻ�����" << endl;
	else
		cout << name << "����" << endl;

	else if (soldier_count == 0) {
		cout << "2�ߴ� �ο� : 0"
	}
}
Soldier::Soldier(const string& name, int grade, const string& hobby) {
	soldier_count++;
	this->name = name;
	this->grade = grade;
	this->hobby = hobby;
	cout << name << "���� �Դ븦 ȯ���մϴ�" << endl;
}
int Soldier::soldier_count = 0;

void Soldier::PrintSoldierCount() {
	cout << "2�ߴ� �ο� : " << soldier_count << "\n";
}

int main() {
	Soldier ym("������", 1, "�Ѹ�����");
	Soldier cb("����ȣ", 1, "�౸");
	Soldier bm("�ڹμ�", 2, "����");
	Soldier yd("�Ӵ���", 2, "����ġ��");
	Soldier ks("�����", 3, "����Ÿ��");
	Soldier ci("���ϱ�", 4, "������ ��û");
	cout << "1) 2�ߴ� 2) ���/Ư�� 3) �δ����� 4) �ǽð� ������ ���� 5) ���� ?";
	int c = 0;
	cin >> c;
	if (c == 1) {
		cout << "2�ߴ� �ο� : " << Soldier::soldier_count << endl;
	}
	else if (c == 2) {
		cout << ym.getName() << " " << ym.getGrade() <<"�� ���(Ư��)�� " << ym.getHobby() << "�Դϴ�." << endl;
		cout << cb.getName() << " " << cb.getGrade() << "�� ���(Ư��)�� " << cb.getHobby() << "�Դϴ�." << endl;
		cout << bm.getName() << " " << bm.getGrade() << "�� ���(Ư��)�� " << bm.getHobby() << "�Դϴ�." << endl;
		cout << yd.getName() << " " << yd.getGrade() << "�� ���(Ư��)�� " << yd.getHobby() << "�Դϴ�." << endl;
		cout << ks.getName() << " " << ks.getGrade() << "�� ���(Ư��)�� " << ks.getHobby() << "�Դϴ�." << endl;
		cout << ci.getName() << " " << ci.getGrade() << "�� ���(Ư��)�� " << ci.getHobby() << "�Դϴ�." << endl;

	}
	else if (c == 3) {
		random_device rd;
		mt19937 gen(rd());
		int a = 0;
		int b = 0;
		cout << "�� �Է� : ";
		cin >> a;
		cout << "�� �Է� : ";
		cin >> b;
		uniform_int_distribution <int> distrib(1, 6);
		int line = 0;
		for (int i = 0; i < a; i++) {
			for (int j = 0; j < b; j++) {
				if(line % 4 == 0){
					line = 0;
					cout << "\n";
				}
				cout << distrib(gen) << ' ';
			}
		}


	}
	else if (c == 4) {
		while (true) {
			string s = "";
			cout << ym.getName() << " �Է� : ";
			cin >> s;
			if (s.find("�ٺ�") || s.find("����") || s.find("��ģ")) {
				cout << "(���ۺҰ�) ******************" << endl;
			}
			else {
				cout << "(���۵�)" << s << endl;
			}
		}
	}
	else if (c == 5) {
		cout << "* ������ ���ϵ帳�ϴ� * " << endl;
		exit;
	}
	//�弳�� �ϸ� ����ε� ó���Ǹ鼭 ���������� ����, ��Ӿ� ó���� �����Լ��� ����Ͻ�
	// �ٺ�, ����, ��ģ
	//(���ۺҰ�) *******************
	// ������ �Է� : 
	// �������� (���۵�)
	// ���� �Է��ϸ� 
	// �Ҹ��ڿ� * ������ ���ϵ帳�ϴ� *
	// () ����
	// () �Ǻ�����
	return 0;
}
//������ ����, static ���� ���
// hobby�� �۾�